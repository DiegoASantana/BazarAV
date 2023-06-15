import os

pasta = 'Itens' 

for nome_arquivo in os.listdir(pasta):
    if nome_arquivo.startswith('roupa'):
        novo_nome = nome_arquivo.replace('roupa', 'item')
        caminho_antigo = os.path.join(pasta, nome_arquivo)
        caminho_novo = os.path.join(pasta, novo_nome)
        os.rename(caminho_antigo, caminho_novo)
