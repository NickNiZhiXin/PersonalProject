
#计算1000内所有的完数：一个数等于它的因子之和
from sys import stdout

for j in range(2,1000):
  k=[]
  n=-1
  s=j
  for i in range (1,j):
    if j%i == 0:
      n +=1
      s -=i
      k.append(i)
  if s == 0:
    print (j)
    for i in range(n):
      stdout.write(str(k[i]))
      stdout.write(' ')
    print (k[n])








