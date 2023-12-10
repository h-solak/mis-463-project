import numpy as np
import pandas as pd
from numpy.linalg import norm
import warnings
from datetime import datetime
import sys
import json
# import spotipy
# from spotipy.oauth2 import SpotifyOAuth
# import base64


warnings.filterwarnings("ignore")

user_vector_danceability = float(sys.argv[1]) / 100.0
user_vector_energy = float(sys.argv[2]) / 100.0
user_vector_acousticness = float(sys.argv[3]) / 100.0
user_vector_valence = float(sys.argv[4]) / 100.0
user_popularity =  None if sys.argv[5] == "None" else sys.argv[5]
user_timeSignature =  None if sys.argv[6] == "None" else sys.argv[6]
# user_key =  None if sys.argv[7] == "None" else sys.argv[7]
user_mode =  None if sys.argv[8] == "None" else int(sys.argv[8])
user_speechy =  sys.argv[9]
user_instrumental =  None if sys.argv[10] == "None" else sys.argv[10]
user_live =  None if sys.argv[11] == "None" else sys.argv[11]
user_number_of_tracks = int(sys.argv[12]) if sys.argv[12].lower() != "none" else None
user_customer_choice_genres = sys.argv[13]
user_genres = sys.argv[14].split(',')


tracks_to_filter = pd.read_csv('Database/Implement/tracks_to_filter.csv')
tracks_to_vectorize = pd.read_csv('Database/Implement/tracks_to_vectorize.csv')


class UserEstablishmentChoice:
    """
    'VECTORS' was created with means of the survey results made with establishment owners. 
    Values in the vector respectively are: 
    danceability, energy, acousticness, valence
    """ 
    VECTORS = {'cafe': [0.374, 0.701, 0.558, 0.694], 
            'bar': [0.769, 0.846, 0.582, 0.802],
            'club': [0.974, 0.857, 0.247, 0.818]}
    
    def __init__(self, ESTABLISHMENT="cafe"):
        self._ESTABLISHMENT = ESTABLISHMENT.lower()
        
    @property
    def ESTABLISHMENT(self):
        return self._ESTABLISHMENT
    
    @ESTABLISHMENT.setter
    def ESTABLISHMENT(self, value):
        self._ESTABLISHMENT = value.lower()
    
    @property
    def VECTOR(self):
        return UserEstablishmentChoice.VECTORS.get(self._ESTABLISHMENT)


class UserVectorSettings:
    DANCEABILITY = None
    ENERGY = None
    ACOUSTICNESS = None
    VALENCE = None

class UserFilterSettings():   
    POPULARITY = None
    MIN_DURATION_OF_EACH_TRACK = None
    MAX_DURATION_OF_EACH_TRACK = None
    TIME_SIGNATURE = None
    KEY = None
    MIN_TEMPO_OF_EACH_TRACK = None
    MAX_TEMPO_OF_EACH_TRACK = None
    MODE = None
    EXPLICIT = None
    SPEECHY = None
    INSTRUMENTAL = None
    LIVE = None
    NUMBER_OF_TRACKS_IN_PLAYLIST = None
    GENRES = None
    CUSTOMER_CHOICE_GENRES = None


def get_vector(est="cafe", danceability=None, energy=None, acousticness=None, valence=None): 
    """
Parameters
----------
est : str, Default 'cafe'.
    Establishment type that has a preset vector for the calculation.
    Other parameters are automatically set when est is one of these:
    'bar', 'cafe', 'club'.
danceability : float, Default None.
    Desired danceability ratio for the calculation.
energy : float, Default None.
    Desired energy ratio for the calculation.
acousticness : float, Default None.
    Desired acousticness ratio for the calculation.
valence : float, Default None.
    Desired valence ratio for the calculation.
    
Returns
-------
A list.
    """
    danceability = UserEstablishmentChoice(est).VECTOR[0] if danceability is None else danceability
    energy = UserEstablishmentChoice(est).VECTOR[1] if energy is None else energy
    acousticness = UserEstablishmentChoice(est).VECTOR[2] if acousticness is None else acousticness
    valence = UserEstablishmentChoice(est).VECTOR[3] if valence is None else valence
    
    return [danceability, energy, acousticness, valence]

def calculate_similarity(vector_df, filter_df, vector):
    """
Parameters
----------
vector_df : pd.DataFrame
    Dataframe that holds vector features to be used in calculation.
filter_df : pd.DataFrame
    Dataframe that holds filter features.
vector : an array-like or list
    An array of elements (danceability, energy, acousticness, valence)
    to be used in calculation. It can be obtained from get_vector().

Returns
-------
A pd.DataFrame.
    """
    sigma=0.6281537543781288
    
    calculated = vector_df.copy()
    calculated['euc_distance'] = norm(calculated.set_index('track_id').values - vector, axis=1)
    calculated['similarity'] = np.exp(-calculated['euc_distance'] ** 2 / (2 * sigma ** 2))
    calculated = calculated[calculated['similarity'] >= np.quantile(calculated.similarity, 0.935)]
    
    ttf = filter_df[filter_df['track_id'].isin(calculated['track_id'])].copy()
    
    return ttf

def filter_tracks(filter_df, est=None,
                popularity=None, min_duration_of_each_track=None,
                max_duration_of_each_track=None, time_signature=None,
                key=None, min_tempo_of_each_track=None,
                max_tempo_of_each_track=None, mode=None,
                explicit=None, speechy='no',
                instrumental=None, live=None,
                number_of_tracks_in_playlist=30,
                genres=None, customer_choice_genres='yes'):
    """
Parameters
----------
filter_df : pd.DataFrame.
    Dataframe to be filtered.
est : str, Default None.
    Establishment type that is same as the one used in calculate_similarity().
popularity : string, Default None.
    Desired popularity for the tracks selected. Options are:
    'unpopular', 'mid-popular', 'popular'.
min_duration_of_each_track : int, Default None.
    Minimum desired duration in seconds for each track.
max_duration_of_each_track : int, Default None.
    Maximum desired duration in seconds for each track.
time_signature : int, Default None.
    Desired time signature. Options are:
    3, 4, 5, 7
key : int, Default None.
    The key the tracks are in. The range is 0-11.
min_tempo_of_each_track : int, Default None.
    Minimum desired tempo (bpm) for each track.
max_tempo_of_each_track : int, Default None.
    Maximum desired tempo (bpm) for each track.
mode : int, Default None.
    Desired mode of the tracks. 0: Minor, 1: Major.
explicit : str, Default None.
    Including explicit tracks or not. 'yes' or 'no'.
speechy : str, Default 'no'.
    Including speechy podcast-like tracks or not. 'yes' or 'no'.
instrumental : str, Default None. 
    Including instrumental tracks or not. 'yes' or 'no'.
live : str, Default None.
    Including live recorded tracks or not. 'yes' or 'no'.
number_of_tracks_in_playlist : int, Default 30.
    Desired number of tracks for the playlist. Ranging between 1-100.
genres : an array-like or list, Default None.
    Desired genres for the tracks. It cannot be given with
    customer_genre_choices.
customer_choice_genres : str, Default 'yes'.
    Selecting only the genres that customers of each establishment
    prefer to listen to. Genres are distributed based on their weight
    that the customer survey determined.

Returns
-------
A pd.DataFrame.
    """    
    df = filter_df.copy()
    number_of_tracks_in_playlist = 30 if number_of_tracks_in_playlist is None\
        else number_of_tracks_in_playlist
    
    popularities = {'unpopular': np.arange(0,41),
                'mid-popular': np.arange(41,70),
                'popular': np.arange(70,101)}
    est = est.lower()
    
    ests = {
    'bar': {'Rock': 0.28,
            'Pop': 0.18,
            'Metal': 0.16,
            'Hip Hop': 0.14,
            'Electronic': 0.10,
            'Jazz': 0.10,
            'R&B': 0.04},
    'cafe': {'Jazz': 0.21,
            'Rock': 0.18,
            'Blues': 0.17,
            'Easy Listening': 0.14,
            'Pop': 0.11,
            'Classical': 0.11,
            'Folk/Acoustic': 0.08},
    'club': {'Electronic': 0.65,
            'Pop': 0.23,
            'Hip Hop': 0.08,
            'Rock': 0.04}}
    
    if popularity is not None:
        pop_range = popularities.get(popularity.lower())
        df = df[df['popularity'].isin(pop_range)].copy()
    
    if min_duration_of_each_track is not None:
        df = df[df['duration'] >= min_duration_of_each_track]
        
    if max_duration_of_each_track is not None:
        df = df[df['duration'] <= max_duration_of_each_track]
        
    if time_signature is not None:
        df = df[df['time_signature'].isin(time_signature)]
        
    if key is not None:
        df = df[df['key'].isin(key)]
        
    if min_tempo_of_each_track is not None:
        df = df[df['tempo'] >= min_tempo_of_each_track]
        
    if max_tempo_of_each_track is not None:
        df = df[df['tempo'] <= max_tempo_of_each_track]
        
    if mode is not None:
        df = df[df['mode'].isin(mode)]
    
    if explicit is not None:
        if explicit.lower() == 'yes':
            df = df[df['explicit'] == 1]
        elif explicit.lower() == 'no':
            df = df[df['explicit'] == 0]
    
    if speechy is not None and len(df[df['speechiness'] >= 0.66]) > number_of_tracks_in_playlist:
        if speechy.lower() == 'yes':
            df = df[df['speechiness'] >= 0.66]
        elif speechy.lower() == 'no':
            df = df[df['speechiness'] < 0.66]
    
    if instrumental is not None:    
        if instrumental.lower() == 'yes':
            df = df[df['instrumentalness'] >= 0.5]
        elif instrumental.lower() == 'no':
            df = df[df['instrumentalness'] < 0.5]
            
    if live is not None:    
        if live.lower() == 'yes' and len(df[df['liveness'] >= 0.8]) > number_of_tracks_in_playlist:
            df = df[df['liveness'] >= 0.8]
        elif live.lower() == 'no':
            df = df[df['liveness'] < 0.8]
        
    if genres is not None and str(customer_choice_genres).lower() != 'yes':
        genres = [g.lower() for g in genres]
        df = df[(df['genre'].str.lower()).isin(genres)].copy()
    
    try:  
        if str(customer_choice_genres).lower() == 'yes':
            genre_dfs = []
            for g, w in ests.get(est).items():
                g_add = df[df['genre'] == g].sample(int(number_of_tracks_in_playlist * w) + 1).copy()
                genre_dfs.append(g_add)
            df = pd.concat(genre_dfs).copy()
        df = df.sample(number_of_tracks_in_playlist).copy()
    except ValueError as e:
        pass
    
    return df

# def create_playlist(track_ids, playlist_name=None, desc=None):
#     """
# Parameters
# ----------
# track_ids : pd.Series or array-like.
#     Track ids to be added to the playlist created.
# playlist_name : str, Default None.
#     Name for the playlist.
# desc : str, Default None.
#     Description for the playlist.

# Returns
# -------
# str.
#     """
#     CLIENT_ID = ''
#     CLIENT_SECRET = ''
#     REDIRECT_URI = ''
#     SCOPE = 'ugc-image-upload playlist-modify-public playlist-modify-private'
#     sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID, 
#                                             client_secret=CLIENT_SECRET, 
#                                             redirect_uri=REDIRECT_URI, scope=SCOPE))
#     user_id = sp.me()['id']
#     playlist = sp.user_playlist_create(user_id, playlist_name, description=desc)
#     sp.playlist_add_items(playlist['id'], track_ids)
    
#     with open("tunemix.jpg", "rb") as image_file:
#         image_64_encode = base64.b64encode(image_file.read())
#         sp.playlist_upload_cover_image(playlist['id'], image_64_encode)
        
#     return f'https://open.spotify.com/playlist/{playlist["id"]}'

est = 'club'
UserVectorSettings.DANCEABILITY = user_vector_danceability
UserVectorSettings.ENERGY = user_vector_energy
UserVectorSettings.ACOUSTICNESS = user_vector_acousticness
UserVectorSettings.VALENCE = user_vector_valence

vector = get_vector(est=est,
                danceability=UserVectorSettings.DANCEABILITY,
                energy=UserVectorSettings.ENERGY,
                acousticness=UserVectorSettings.ACOUSTICNESS,
                valence=UserVectorSettings.VALENCE)

filter_df = calculate_similarity(vector_df=tracks_to_vectorize, filter_df=tracks_to_filter, vector=vector)

UserFilterSettings.POPULARITY = user_popularity
UserFilterSettings.MIN_DURATION_OF_EACH_TRACK = None
UserFilterSettings.MAX_DURATION_OF_EACH_TRACK = None
UserFilterSettings.TIME_SIGNATURE = user_timeSignature
UserFilterSettings.KEY = None
UserFilterSettings.MIN_TEMPO_OF_EACH_TRACK = None
UserFilterSettings.MAX_TEMPO_OF_EACH_TRACK = None
UserFilterSettings.MODE = user_mode
UserFilterSettings.EXPLICIT = None
UserFilterSettings.SPEECHY = user_speechy
UserFilterSettings.INSTRUMENTAL = user_instrumental
UserFilterSettings.LIVE = user_live
UserFilterSettings.NUMBER_OF_TRACKS_IN_PLAYLIST = user_number_of_tracks
UserFilterSettings.GENRES = None
UserFilterSettings.CUSTOMER_CHOICE_GENRES = user_customer_choice_genres

tracks_filtered = filter_tracks(
                filter_df=filter_df,
                est=est,
                popularity=UserFilterSettings.POPULARITY,
                min_duration_of_each_track=UserFilterSettings.MIN_DURATION_OF_EACH_TRACK,
                max_duration_of_each_track=UserFilterSettings.MAX_DURATION_OF_EACH_TRACK,
                time_signature=UserFilterSettings.TIME_SIGNATURE,
                key=UserFilterSettings.KEY,
                min_tempo_of_each_track=UserFilterSettings.MIN_TEMPO_OF_EACH_TRACK,
                max_tempo_of_each_track=UserFilterSettings.MAX_TEMPO_OF_EACH_TRACK,
                mode=UserFilterSettings.MODE,
                explicit=UserFilterSettings.EXPLICIT,
                speechy=UserFilterSettings.SPEECHY,
                instrumental=UserFilterSettings.INSTRUMENTAL,
                live=UserFilterSettings.LIVE,
                number_of_tracks_in_playlist=UserFilterSettings.NUMBER_OF_TRACKS_IN_PLAYLIST,
                genres=UserFilterSettings.GENRES,
                customer_choice_genres=UserFilterSettings.CUSTOMER_CHOICE_GENRES)

song_ids = np.array(tracks_filtered['track_id'])
song_ids_list = song_ids.tolist()
song_ids_json = json.dumps(song_ids_list)
print(song_ids_json)