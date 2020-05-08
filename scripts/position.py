import os, sys
sys.path.append('../codeFight')
os.environ['DJANGO_SETTINGS_MODULE'] = 'codeFight.settings'
import django
django.setup()
from game.models import PointPosition

file_path = '../resources/position.txt'

positions = []
pos = []
with open(file_path) as fp:
   line = fp.readline()
   cnt = 1
   while line:
        if(cnt > 1):
            pos = line.strip().split(' ')
            pos[0] = int(pos[0])
            pos[1] = int(pos[1])
            pos[2] = int(pos[2])
            positions.append(pos)
        line = fp.readline()
        cnt += 1

print("Starting to seed positions, do not interrupt")
for pos in positions:
    data = PointPosition.objects.create(point=pos[0], x=pos[1], y=pos[2])
print("positions seeded")