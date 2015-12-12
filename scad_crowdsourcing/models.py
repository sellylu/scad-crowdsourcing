from django.db import models

class Question(models.Model):
	content = models.CharField(max_length=200)
	created_at = models.DateTimeField(auto_now_add=True)

class Answer(models.Model):
	question = models.ForeignKey(Question, on_delete=models.CASCADE)
	content = models.CharField(max_length=200)
	pic = models.URLField()
	likes = models.IntegerField()
