from flask import Flask, request, jsonify
import joblib
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
model, symptoms, le = joblib.load('model_and_symptoms.joblib')

@app.route('/predictdisease', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        input_symptoms = data.get('features', [])
        
        if not isinstance(input_symptoms, list) or not all(isinstance(symptom, str) for symptom in input_symptoms):
            return jsonify({'error': 'Invalid input data'}), 400

        # Preprocess input data
        input_data = preprocess_input(input_symptoms, symptoms)

        if len(input_data[0]) != len(symptoms):
            return jsonify({'error': f'Input data must have {len(symptoms)} features, but has {len(input_data[0])} features.'}), 400

        # Make predictions
        prediction = model.predict(input_data)
        predicted_disease = le.inverse_transform(prediction)
        
        # Create response with feature names
        input_data_with_names = {symptoms[i]: input_data[0][i] for i in range(len(symptoms))}
        response = {'predicted_disease': predicted_disease[0], 'input_features': input_data_with_names}
        
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

def preprocess_input(input_symptoms, all_symptoms):
    input_data = [int(symptom in input_symptoms) for symptom in all_symptoms]
    return [input_data]

if __name__ == '__main__':
    app.run(debug=True)
