l = [1,2,3,6,7,5,8,9]

for el in l:
    print(el)
    if el in (2,3,5):
        print("удаляю", el)
        l.remove(el)
        print("после удаления", l)

print(el)