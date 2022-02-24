Machine learning is an ever-evolving field. One area of machine learning that has evolved greatly over the span of a few years is Natural Language Processing (NLP). The [HuggingFace](https://huggingface.co/) organization has been on the forefront in making contributions in this field. This tutorial will leverage the zero-shot classification model from huggingface to extract model predictions and perform multi-class classification. 

### Zero-shot classification
Yin et al. proposed a method for using pre-trained NLI models as a ready-made zero-shot sequence classifiers. The method works by posing the sequence to be classified as the NLI premise and to construct a hypothesis from each candidate label. For example, if we want to evaluate whether a sequence belongs to the class "politics", we could construct a hypothesis of This text is about politics.. The probabilities for entailment and contradiction are then converted to label probabilities.

This method is surprisingly effective in many cases, particularly when used with larger pre-trained models like BART and Roberta. See this blog post for a more expansive introduction to this and other zero shot methods, and see the code snippets below for examples of using this model for zero-shot classification both with Hugging Face's built-in pipeline and with native Transformers/PyTorch code.

### How to leverage the huggingface API to perform classification
Let's begin by installing Transformers

```bash
!pip install transformers
```
We need to import `pipeline` into our code.

```python
from transformers import pipeline
```

```python
classifier = pipeline ("zero-shot-classification", model = "facebook/bart-large-mnli")
```
BART is a transformer encoder-encoder (seq2seq) model with a bidirectional (BERT-like) encoder and an autoregressive (GPT-like) decoder. BART is pre-trained by (1) corrupting text with an arbitrary noising function, and (2) learning a model to reconstruct the original text.

BART is particularly effective when fine-tuned for text generation (e.g. summarization, translation) but also works well for comprehension tasks (e.g. text classification, question answering).

### How to implement your own Zero-Shot classifier using Python

```python
sequence_to_classify = "one day I will see the world"
candidate_labels = ['travel', 'cooking', 'dancing']
classifier(sequence_to_classify, candidate_labels)
```
### Multi-class classification

```python
candidate_labels = ['travel', 'cooking', 'dancing', 'exploration']
classifier(sequence_to_classify, candidate_labels, multi_class=True)
```

### Further reading
- [HuggingFace](https://huggingface.co/models?pipeline_tag=zero-shot-classification&sort=downloads)
- [Zero shot learning](https://en.wikipedia.org/wiki/Zero-shot_learning)
- [Benchmarking Zero-shot Text Classification: Datasets, Evaluation and Entailment Approach](https://arxiv.org/pdf/1909.00161.pdf)
