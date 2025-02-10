"""blablabla"""
with (
    open('./dist/index.html', encoding='UTF-8') as f_index,
    open('./dist/404.html', 'w', encoding='UTF-8') as f_404,
):
    f_404.write(f_index.read())
