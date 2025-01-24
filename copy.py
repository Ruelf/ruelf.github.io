with open('./dist/index.html') as f:
    text = f.read()

with open('./dist/404.html', 'w') as f:
    f.write(text)
