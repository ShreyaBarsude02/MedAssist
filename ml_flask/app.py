from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

model, symptoms, le = joblib.load('model_and_symptoms.joblib')

def preprocess_input(input_symptoms):
    input_data = [int(symptom in input_symptoms) for symptom in symptoms]
    return [input_data]

@app.route('/predictdisease', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        input_symptoms = data.get('features', [])

        if not isinstance(input_symptoms, list) or not all(isinstance(symptom, str) for symptom in input_symptoms):
            return jsonify({'error': 'Invalid input data'}), 400

        input_data = preprocess_input(input_symptoms)

        if len(input_data[0]) != len(symptoms):
            return jsonify({'error': f'Input data must have {len(symptoms)} features, but has {len(input_data[0])} features.'}), 400

        prediction = model.predict(input_data)
        predicted_disease = le.inverse_transform(prediction)
        response = {'predicted_disease': predicted_disease[0]}
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
