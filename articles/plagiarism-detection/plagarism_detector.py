from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd


class Plagarism_Checker():

    def __init__(self, corpus, vectorizer=None):
        self.doc_names , self.doc_data = zip(*corpus)
        self._vectorizer = vectorizer


    @property
    def vectorizer(self):
        if self._vectorizer is None:
            raise TypeError("vecotrizer can't be None")
        if not hasattr(self._vectorizer, '_fit_transform'):
            self.__compute_document_term_matrix()
        return self._vectorizer

    @vectorizer.setter
    def vectorizer(self, value):
        if not isinstance(value, None):
            self._vectorizer = value
            self.__compute_document_term_matrix()
        else:
            self._vectorizer = value

    def __compute_document_term_matrix(self):
        self._vectorizer._fit_transform= self._vectorizer.fit_transform(self.doc_data)



    def get_document_term_matrix(self):
        count_vector = self.vectorizer._fit_transform.toarray()
        return count_vector


    def get_feature_words(self):
        return  self.vectorizer.get_feature_names()
 

    def get_document_term_matrix_dataframe(self):
        df = pd.DataFrame(data= self.get_document_term_matrix(), 
                  columns= self.get_feature_words(), 
                  index=self.doc_names)

        return df


    def get_cosine_simularity_dataframe(self):
        # compute cosine simularity matrix
        df = pd.DataFrame(data= cosine_similarity(self.get_document_term_matrix()),
                  columns=self.doc_names, 
                  index=self.doc_names)

        return df
   

class Count_Vectorizer_Detector(Plagarism_Checker):

    def __init__(self, corpus):
        super().__init__(corpus, vectorizer= CountVectorizer())
        

    
    

   
class Tdif_Vectorizer_Detector(Plagarism_Checker):

    def __init__(self, corpus):
        super().__init__(corpus , vectorizer=TfidfVectorizer(smooth_idf=True,use_idf=True) )


        

    def get_tfidf_weights_dataframe(self):
        # print idf values # need to compute self.vectorizer.idf_ if not computed
        df_idf = pd.DataFrame(self.vectorizer.idf_, index=self.get_feature_words(),columns=["idf_weights"])

         # sort ascending 
        df_idf.sort_values(by=['idf_weights'])

        return df_idf


if __name__ == "__main__":


    # define document data
    corpus = [
    ('doc_1', 'This is the first document.'),
        ('doc_2', 'This document is the second document.'),
    ('doc_3' ,'And this is the third one.'),
        ('doc_4', 'Is this the first document?')
    ]

    # split doc_names and doc_data 
    doc_names, doc_data = zip(*corpus)

    # create the class Countvectorizer that converts a collection of text document to a matrix of token counts
    vectorizer = CountVectorizer()






    # return a term-document matrix with doc_data as input
    # X: array, [n_samples, n_featrues]
    document_term_matrix = vectorizer.fit_transform(doc_data)

    tf_enable = True
    if(tf_enable):
        tfidf_transformer = TfidfTransformer(smooth_idf=True,use_idf=True) 
        tfidf_transformer.fit(document_term_matrix)
        idf = tfidf_transformer.idf_

        # print idf values
        df_idf = pd.DataFrame(tfidf_transformer.idf_, index=vectorizer.get_feature_names(),columns=["idf_weights"]) 
    
        # sort ascending 
        df_idf.sort_values(by=['idf_weights'])
        print(df_idf)

        
        tf_idf_vector = tfidf_transformer.transform(document_term_matrix)

        df = pd.DataFrame(tf_idf_vector.T.todense(), index=vectorizer.get_feature_names(), columns=doc_names) 
        #df.sort_values(by=["tfidf"],ascending=False)

        print(df)

        cosine_matrix = cosine_similarity(tf_idf_vector)

        df = pd.DataFrame(data=cosine_matrix, 
                    columns= doc_names, 
                    index=doc_names)

        print(df)



    # returns full list of tokenized words
    tokenized_words =  vectorizer.get_feature_names()

    # output pandas table document_term_matrix
    df = pd.DataFrame(data=document_term_matrix.toarray(), 
                    columns= tokenized_words, 
                    index=doc_names)


    print(df)


    # compute cosine simularity matrix
    cosine_matrix = cosine_similarity(document_term_matrix)

    df = pd.DataFrame(data=cosine_matrix, 
                    columns= doc_names, 
                    index=doc_names)

    print(df)

