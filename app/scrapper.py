from bs4 import BeautifulSoup as bs
import requests

def scrapper(github_username):
    try:
        url = f'https://github.com/{github_username}'
        response = requests.get(url)
    
        html = bs(response.content, 'html.parser')
        
        # Check if username exist
        if (html.get_text() == 'Not Found'): 
            return {'message': 'Username not found'}
        
        # Get webpage detials
        username = html.find('span', attrs= {'itemprop': 'additionalName'}).get_text().strip()
        avatar_url = html.find('img', attrs = {'alt': 'Avatar'})['src']
        name = html.find('span', attrs = {'class': 'p-name'}).get_text().strip()
        num_of_repos = html.find('span', attrs = {'class': 'Counter'}).get_text()
        followers = html.find('a', attrs = {'href': f'https://github.com/{username}?tab=followers'}).span.get_text().strip()
        following = html.find('a', attrs = {'href': f'https://github.com/{username}?tab=following'}).span.get_text().strip()
        starred = html.find('a', attrs = {'href': f'https://github.com/{username}?tab=stars'}).span.get_text().strip()
        popular_repos = []

        for repo in html.find('ol').find_all('li'):
            popular_repos.append(get_repo_details(repo))
            
        return {'message': 'success', 'data': {'avatar_url': avatar_url, 'name': name, 'username': username, 'num_of_repos': num_of_repos, 'followers': followers, 'following': following, 'starred': starred, 'popular_repos': popular_repos}}
    
    except requests.exceptions.RequestException as e:
        return  {'message': 'An error occured please try again!!'} 

    except AttributeError as e:
        return  {'message': 'An error occured please try again!!', 'error': e} 

# Get repo details from webpage
def get_repo_details(repo):
    repo_details = {}
    repo_details['name'] = repo.a.span.text
    repo_details['href'] = repo.a['href']
    repo_details['repo_status'] = repo.find('span', attrs = {'class': 'Label Label--secondary v-align-middle ml-1'}).get_text()
   

    forked_from = repo.find('p', attrs = {'class': 'color-fg-muted text-small mb-2'})
    description = repo.find('p', attrs = {'class': 'pinned-item-desc color-fg-muted text-small d-block mt-2 mb-3'})
    language = repo.find('span', attrs = {'itemprop': 'programmingLanguage'})
    language_color = repo.find('span', attrs = {'class': 'repo-language-color'})

    if (forked_from):
        repo_details['forked_from'] = forked_from.text.split('\n')[1].strip().split('Forked from ')[1]

    if (description and description.text.split('\n')[1].strip() != ''):
        repo_details['description'] = description.text.split('\n')[1].strip()

    if (language):
        repo_details['language'] = language.text
        repo_details['language_color'] = language_color['style'].split('background-color: ')[1]

    return repo_details
