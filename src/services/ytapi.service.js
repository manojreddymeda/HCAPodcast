const CHANNEL_ID = "UCL03ygcTgIbe36o2Z7sReuQ"; //"UCuDaP0Gb68Qx5euzQ9q6T8Q" //

const gapi = window.gapi;

export function channelInfo() {
    return gapi.client.youtube.channels.list({
        "part": [
            "snippet,contentDetails,statistics"
        ],
        "id": [
            CHANNEL_ID
        ]
    })
        .then(function (response) {

            return response.result
        },
            function (err) { console.error("Execute error", err); });
}

export function listPlaylistForTheChannel() {

    return gapi.client.youtube.playlists.list({
        "part": [
            "snippet,contentDetails"
        ],
        "channelId": CHANNEL_ID,
        "maxResults": 100
    })
        .then(function (response) {

            return response.result
        },
            function (err) {

                return err
            });

}

export function listVideosByPlayList(playlistId, nextPageToken, prevList = []) {
    if (!playlistId) {
        return
    }
    return gapi.client.youtube.playlistItems.list({
        "part": [
            "snippet,contentDetails"
        ],
        "pageToken": nextPageToken,
        "maxResults": 100,
        "playlistId": playlistId
    })
        .then(function (response) {
            if (response.result.nextPageToken) {
                response.result.items = [...prevList, ...response.result.items]
                return listVideosByPlayList(playlistId, response.result.nextPageToken, response.result.items)
            }
            response.result.items = [...prevList, ...response.result.items]
            return response.result
        },
            function (err) {

                return err
            }
        );

}

export function getVideoById(videoId) {
    return gapi.client.youtube.videos.list({
        "part": [
            "statistics, player"
        ],
        "maxWidth": 1100,
        "id": [videoId]
    })
        .then(function (response) {
            return response.result
        },
            function (err) { console.error("Execute error", err); });
}