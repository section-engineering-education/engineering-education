import numpy as np


class PerceptronClass:

    def __init__(self, learning_rate=0.01, num_iters=1000):
        self.weights = None
        self.bias = None
        self.num_iterations = num_iters
        self.lr = learning_rate

    def _unit_step_func(self, x):
        return np.where(x >= 0, 1, 0)

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # init parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        y_ = np.array([1 if i > 0 else 0 for i in y])

        for _ in range(self.num_iterations):

            for idx, x_i in enumerate(X):

                linear_output = np.dot(x_i, self.weights) + self.bias
                y_predicted = self._unit_step_func(linear_output)

                # Perceptron weight update rule:
                # weight := weight - learning_rate*(error)
                update = self.lr * (y_predicted - y_[idx])

                self.weights -= update * x_i
                self.bias -= update

    def predict(self, X):
        linear_output = np.dot(X, self.weights) + self.bias
        y_predicted = self._unit_step_func(linear_output)
        return y_predicted


    
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score 

data = load_iris()
X, y = data.data, data.target
X_train, X_test, Y_train, Y_test = train_test_split(X,y, test_size=0.2)

perceptron = PerceptronClass()
perceptron.fit(X_train,Y_train)


y_predicted = perceptron.predict(X_test)
y_predicted_train = perceptron.predict(X_train)
acc = accuracy_score(y_predicted,Y_test)
train_acc = accuracy_score(y_predicted_train,Y_train)
print("Training Accuracy: ", train_acc)
print("Testing Accuracy: ", acc)
