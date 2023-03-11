import bs4 as bs
import urllib.request
'''Non-scrappable sites'''################
link3 = 'https://pythonprogramming.net/parsememcparseface/'
#not qualifying certification


'''scrappable sites'''
#note, when you try to print out the soup, it will output an error that says a unicode is not 
#recognized. But ignore it and just keep scraping!!!
#technically you can scrape it. It's just the character that prevents it
link1 = 'https://www.amazon.com/gp/yourstore?ie=UTF8&ref=ox_checkout_redirects_yourstore'
link6 = 'https://www.nytimes.com/'
#scapes perfectly fine
link2 = 'https://www.google.com/'
link4 = 'https://drive.google.com/drive/u/2/my-drive'
link5 = 'https://www.stonybrook.edu/'


sauce = urllib.request.urlopen(link5).read()
soup = bs.BeautifulSoup(sauce,'lxml')
'''
functions
soup.title
soup.text
soup.strings
soup.find_all('html element')
soup.nav
'''

#how to print text inside the <p> tag
'''
for parapgraph in soup.find_all('p'):
    #print(paragraph.string)    This string would work if the <p> has no child tags inside it
    print(parapgraph.text)
'''

'''
#how to print urls
for url in soup.find_all('a'):
    #print(url.text)     #won't work because it will print out the text attached to the hyperlink
    print(url.get('href')) 
'''
nav = soup.nav

for url in nav.find_all('a'):
    print(url.get('href'))