with (
    open('./dist/index.html') as f_index,
    open('./dist/404.html', 'w') as f_404,
):
    f_404.write(f_index.read())
