from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Konfigurasi Path Dinamis
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model_paprika_final.h5')
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Daftar nama kelas sesuai dengan urutan latihan model (alphabetical order)
CLASS_NAMES = ['Bacterial_spot', 'Cercospora Leaf Spot', 'Healthy']

CLASS_METADATA = {
    'Bacterial_spot': {
        'title': 'Bercak Bakteri',
        'description': 'Analisis neural mendeteksi lesi nekrotik basah dengan halo klorotik pada kutikula daun, sangat konsisten dengan infeksi bakteri Xanthomonas.',
        'treatments': [
            {'title': "Karantina Spesimen", 'desc': "Pisahkan tanaman yang terinfeksi untuk mencegah penyebaran lateral."},
            {'title': "Bakterisida Tembaga", 'desc': "Semprotkan pada seluruh permukaan daun setiap 10 hari."},
            {'title': "Sterilisasi Alat", 'desc': "Bersihkan gunting pangkas dengan alkohol 70% setelah penggunaan."}
        ]
    },
    'Cercospora Leaf Spot': {
        'title': 'Bercak Daun Cercospora',
        'description': 'Terdeteksi bintik-bintik kecil berbentuk bulat dengan pusat berwarna abu-abu, ciri khas infeksi jamur Cercospora capsici.',
        'treatments': [
            {'title': "Kurangi Kelembapan", 'desc': "Pastikan jarak tanam cukup agar sirkulasi udara baik."},
            {'title': "Fungisida", 'desc': "Gunakan fungisida berbahan aktif mankozeb atau klorotalonil."},
            {'title': "Sanitasi Lahan", 'desc': "Bersihkan sisa-sisa tanaman yang terinfeksi dari area penanaman."}
        ]
    },
    'Healthy': {
        'title': 'Sehat',
        'description': 'Jaringan daun tampak sehat tanpa adanya tanda-tanda patogen atau defisiensi nutrisi yang signifikan.',
        'treatments': [
            {'title': "Pemeliharaan Rutin", 'desc': "Lanjutkan penyiraman dan pemupukan terjadwal."},
            {'title': "Pemantauan Berkala", 'desc': "Lakukan inspeksi visual setiap minggu untuk deteksi dini."},
            {'title': "Nutrisi Optimal", 'desc': "Pastikan tanaman mendapatkan asupan N-P-K yang seimbang."}
        ]
    }
}

# Global Model Variable
model = None

def get_model():
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"File model tidak ditemukan di {MODEL_PATH}")
        print(f"Memuat model dari {MODEL_PATH}...")
        model = load_model(MODEL_PATH)
        print("Model berhasil dimuat.")
    return model

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'Tidak ada file dikirim', 'status': 'failed'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Nama file kosong', 'status': 'failed'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        # Panggil fungsi lazy-load model
        net = get_model()
        
        # Load dan preprocess image
        img = Image.open(filepath).convert('RGB')
        img = img.resize((224, 224))
        
        img_array = np.array(img, dtype=np.float32)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Inference
        predictions = net.predict(img_array)
        pred_probs = predictions[0]
        pred_idx = int(np.argmax(pred_probs))
        raw_confidence = float(pred_probs[pred_idx])

        # Normalkan confidence score agar tidak mencapai 100%
        if raw_confidence > 0.85:
            confidence = 0.85 + (raw_confidence - 0.85) * 0.85
        else:
            confidence = raw_confidence

        class_name = CLASS_NAMES[pred_idx]
        
        # Print hasil prediksi di terminal
        print("\n" + "="*50)
        print(f"File Terproses : {filename}")
        print(f"Hasil Prediksi : {class_name}")
        print(f"Confidence     : {confidence * 100:.2f}%")
        print(f"Probabilitas   : {list(zip(CLASS_NAMES, [float(x) for x in pred_probs]))}")
        print("="*50 + "\n")

        metadata = CLASS_METADATA.get(class_name, {
            'title': class_name,
            'description': 'Hasil klasifikasi tidak dikenal.',
            'treatments': []
        })

        result = {
            'class': class_name,
            'confidence': confidence,
            'status': 'success',
            **metadata
        }
        
    except Exception as e:
        result = {'error': str(e), 'status': 'failed'}
    
    # Hapus file setelah diproses untuk menghemat penyimpanan
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
        except Exception as err:
            print(f"Gagal menghapus file sementara: {err}")
            
    return jsonify(result)

@app.route('/health', methods=['GET'])
def health():
    try:
        get_model()
        model_loaded = True
    except Exception as e:
        model_loaded = False
        print(f"Gagal memuat model di health check: {e}")
        
    return jsonify({
        'status': 'active',
        'model_loaded': model_loaded,
        'backend': 'TensorFlow/Keras'
    })

if __name__ == '__main__':
    # Jalankan server di port 5000 agar sesuai dengan port yang dipanggil oleh frontend Next.js
    app.run(host='0.0.0.0', port=5000, debug=False)
