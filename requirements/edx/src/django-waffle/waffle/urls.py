from django.conf.urls.defaults import patterns, url

from waffle.views import wafflejs

urlpatterns = patterns('',
    url(r'^waffle.js$', wafflejs, name='wafflejs'),
)
