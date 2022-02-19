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
        
        # Get Profile detials
        username = html.find('span', attrs= {'itemprop': 'additionalName'}).get_text().strip()
        avatar_url = html.find('img', attrs = {'alt': 'Avatar'})['src']
        name = html.find('span', attrs = {'class': 'p-name'}).get_text().strip()
        num_of_repos = html.find('span', attrs = {'class': 'Counter'}).get_text()

        followers_tag = html.find('a', attrs = {'href': f'https://github.com/{username}?tab=followers'})
        following_tag = html.find('a', attrs = {'href': f'https://github.com/{username}?tab=following'})
        starred_tag = html.find('a', attrs = {'href': f'https://github.com/{username}?tab=stars'})

        if (followers_tag):
            followers = followers_tag.span.get_text().strip()
        else: followers = ''
        
        if (following_tag):
            following = following_tag.span.get_text().strip()
        else: following = ''

        if (starred_tag):
            starred = starred_tag.span.get_text().strip()
        else: starred = ''

        popular_repos = []

        if html.find('div', attrs = {'class': 'blankslate mb-4'}):
            popular_repos = f"{username} doesn't have any public repositories yet."
        else:
            for repo in html.find('ol').find_all('li'):
                popular_repos.append(get_repo_details(repo))
            
        return {'message': 'success', 'data': {'avatar_url': avatar_url, 'name': name, 'username': username, 'num_of_repos': num_of_repos, 'followers': followers, 'following': following, 'starred': starred, 'popular_repos': popular_repos}}
    
    except requests.exceptions.RequestException as e:
        return  {'message': 'An error occured.\nCheck you network and try again!!'} 

    except AttributeError as e:
        return  {'message': 'An error occured please try again!!', 'error': e} 

# Get popular repo details
def get_repo_details(repo):
    repo_details = {}
    repo_details['name'] = repo.a.span.text
    repo_details['href'] = repo.a['href']

    # The two possible value of the class attribute holding repo status.
    status1 = repo.find('span', attrs = {'class': 'Label Label--secondary v-align-middle ml-1'})
    status2 = repo.find('span', attrs = {'class': 'Label Label--secondary v-align-middle mt-1 no-wrap v-align-baseline'})
    
    repo_details['repo_status'] =  status2.get_text() if status1 is None else status1.get_text()
   

    forked_from = repo.find('p', attrs = {'class': 'color-fg-muted text-small mb-2'})
    description = repo.find('p', attrs = {'class': 'pinned-item-desc color-fg-muted text-small d-block mt-2 mb-3'})
    
    if (not description):
        description = repo.find('p', attrs = {'class': 'pinned-item-desc color-text-secondary text-small d-block mt-2 mb-3'})
    
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
