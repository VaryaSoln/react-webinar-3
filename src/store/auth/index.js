import StoreModule from "../module";

class AuthState extends StoreModule {
    initState() {
        return {
            authorized: sessionStorage.getItem("token")? true : false,
            error: "",
            userId: sessionStorage.getItem("userId")? sessionStorage.getItem("userId") : null,
        };
    }

    async authorize(login, password) {

        try {
            const response = await fetch("/api/v1/users/sign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login: login, password: password })
            });
            const json = await response.json();
            sessionStorage.setItem('token', json.result.token);
            sessionStorage.setItem('userId', json.result.user._id);
            this.setState({
                ...this.getState(),
                authorized: true,
                userId: json.result.user._id,
            })

        } catch (e) {
            this.setState({
                ...this.getState(),
                error: e.message,
            })

        }
    }

    async exit(){
        console.log("----------exit");
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        await fetch("/api/v1/users/sign", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'X-Token': sessionStorage.getItem('token'),
            },
        });
        this.setState({
            ...this.getState(),
            authorized: false,
            token: "",
            user: null,
        })

    }
}
export default AuthState;