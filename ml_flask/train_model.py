import pandas as pd
from sklearn import tree, svm
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

def train_model():
    df_original = pd.read_csv('dataset/Original_Dataset.csv')

    symptoms = df_original.iloc[:, 1:].values.flatten()
    symptoms = list(set(symptoms))

    symptom_columns = pd.DataFrame(0, index=df_original.index, columns=symptoms)
    for symptom in symptoms:
        symptom_columns[symptom] = df_original.iloc[:, 1:].apply(lambda row: int(symptom in row.values), axis=1)

    df_combined = pd.concat([df_original[['Disease']], symptom_columns], axis=1)

    le = LabelEncoder()
    df_combined['Disease'] = le.fit_transform(df_combined['Disease'])
    X = df_combined.drop(columns="Disease")
    y = df_combined['Disease']

    # Assign column names to features
    X.columns = X.columns.astype(str)

    base_models = [
        ('dtree', tree.DecisionTreeClassifier()),
        ('rf', RandomForestClassifier()),
        ('svm', svm.SVC(probability=True)),
        ('nb', GaussianNB()),
        ('knn', KNeighborsClassifier())
    ]

    meta_model = RandomForestClassifier()
    stacking_ensemble = StackingClassifier(estimators=base_models, final_estimator=meta_model)

    # Train the stacking ensemble model
    stacking_ensemble.fit(X, y)

    # Save the model along with symptoms and label encoder
    joblib.dump((stacking_ensemble, X.columns.tolist(), le), 'model_and_symptoms.joblib')

if __name__ == "__main__":
    train_model()
