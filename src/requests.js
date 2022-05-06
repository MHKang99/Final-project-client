const baseUrl = "http://localhost:3000/api/v1";

export const Posts = {
    // fetch all the Posts from the rails server
    index() {
        return fetch(`${baseUrl}/posts`).then(res => res.json())
    },
    show(pid) {
        return fetch(`${baseUrl}/posts/${pid}`).then(res => res.json())
    },
    create(params) {
        return fetch(`${baseUrl}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    update(params, pid) {
        return fetch(`${baseUrl}/posts/${pid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    destroy(pid) {
        return fetch(`${baseUrl}/posts/${pid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json())
    }
}

export const Games = {
    // fetch all the games from the rails server
    index() {
        return fetch(`${baseUrl}/games`).then(res => res.json())
    },
    show(gid) {
        return fetch(`${baseUrl}/games/${gid}`).then(res => res.json())
    },
    create(params) {
        return fetch(`${baseUrl}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    destroy(gid) {
        return fetch(`${baseUrl}/games/${gid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json())
    },
    user_index(uid) {
        return fetch(`${baseUrl}/games/user_index?id=${uid}`).then(res => res.json())
    }
}

export const Session = {
    create(params) {
        return fetch(`${baseUrl}/session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => {
            return res.json()
        })
    },
    destroy() {
        return fetch(`${baseUrl}/session`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(res => res.json())
    }

}

export const User = {
    current() {
        return fetch(`${baseUrl}/users/current`, {
            credentials: "include"
        }).then(res => {
            return res.json()
        })
    },
    create(params) {
        return fetch(`${baseUrl}/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: params })
        }).then(res => res.json())
    },
    index() {
        return fetch(`${baseUrl}/users`).then(res => res.json())
    },
    show(uid) {
        return fetch(`${baseUrl}/users/${uid}`).then(res => res.json())
    }
}
