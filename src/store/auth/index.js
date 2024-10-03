import StoreModule from "../module";

class AuthState extends StoreModule {
    initState() {
        return {
            authorized: false,
            error: "",
            token: "",
            user: null,
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
            this.setState({
                ...this.getState(),
                authorized: true,
                token: json.result.token,
                user: json.result.user,
            })

        } catch (e) {
            this.setState({
                ...this.getState(),
                error: e.message,
            })

        }
    }

    async exit(){
        console.log("exit");
        this.setState({
            ...this.getState(),
            authorized: false,
            token: "",
            user: null,
        })

    }
}
export default AuthState;