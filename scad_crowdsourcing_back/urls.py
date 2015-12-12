from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

from scad_crowdsourcing.views import index
from scad_crowdsourcing.views import ask
from scad_crowdsourcing.views import listResult
from scad_crowdsourcing.views import result
urlpatterns = [
			   url(r'^admin/', include(admin.site.urls)),
			   url(r'^$', index),
			   url(r'^ask$',ask),
			   url(r'^results$',listResult),
			   url(r'^results/\w$',result)
			   ]
