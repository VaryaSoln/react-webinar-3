import useSelector from "../../hooks/use-selector";
import StoreModule from "../module";

class ProfileState extends StoreModule {
    initState() {
        return {
            user: {
                email: "",
                profile: {
                    name: "",
                    phone: "",
                },
            },
        };
    };

    async load() {
        const response = await fetch("/api/v1/users/self?fields=*", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-Token': sessionStorage.getItem('token'),
            }
        });
        const json = await response.json();
        this.setState({
            ...this.getState(),
            user: json.result,
        })
    }

}
export default ProfileState;