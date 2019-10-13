from rest_framework import viewsets

from articles.models import Article
from .serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    """
    A viewset which combines List, Create, Retrieve, Update, Destroy views.
    """
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
