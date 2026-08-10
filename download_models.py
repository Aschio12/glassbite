import urllib.request
import json
import os
import time

def search_and_download(query, filename):
    url = f"https://api.github.com/search/code?q={query}+extension:glb"
    req = urllib.request.Request(url)
    req.add_header('User-Agent', 'Mozilla/5.0')
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data['items']:
                # Get the first item
                item = data['items'][0]
                raw_url = item['html_url'].replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')
                print(f"Downloading {filename} from {raw_url}...")
                
                download_req = urllib.request.Request(raw_url)
                download_req.add_header('User-Agent', 'Mozilla/5.0')
                with urllib.request.urlopen(download_req) as dl_response:
                    content = dl_response.read()
                    with open(f"public/models/{filename}", 'wb') as f:
                        f.write(content)
                print(f"Saved {filename} ({len(content)} bytes)")
                return True
            else:
                print(f"No results for {query}")
                return False
    except Exception as e:
        print(f"Error for {query}: {e}")
        return False

os.makedirs("public/models", exist_ok=True)
search_and_download("burger", "burger.glb")
time.sleep(3) # avoid rate limit
search_and_download("pizza", "pizza.glb")
time.sleep(3)
search_and_download("fries", "fries.glb")
time.sleep(3)
search_and_download("soda", "drink.glb")

