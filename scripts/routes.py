import os, sys
sys.path.append('../codeFight')
os.environ['DJANGO_SETTINGS_MODULE'] = 'codeFight.settings'
import django
django.setup()
from game.models import MapRoute

file_path = '../resources/routes.txt'

routes = []
route = []
with open(file_path) as fp:
   line = fp.readline()
   cnt = 1
   while line:
        if(cnt > 1):
            route = line.strip().split(' ')
            route[0] = int(route[0])
            route[1] = int(route[1])
            route[2] = route[2].lower()
            routes.append(route)
        line = fp.readline()
        cnt += 1

print("Starting to seed routes, do not interrupt")
for route in routes:
    data = MapRoute.objects.create(point_1=route[0], point_2=route[1], mode=route[2])
print("Routes seeded")