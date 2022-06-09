from django.test import SimpleTestCase
from django.urls import reserve, resolve
from map.views import map

class TestUrls(SimpleTestCase):

    def test_map_url_is_resolved(self):
        url = reserve('index')
        print(resolve(url))
        self.assertEquals(resolve(url).func, map)