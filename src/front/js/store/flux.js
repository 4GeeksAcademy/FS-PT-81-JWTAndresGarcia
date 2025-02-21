const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			BACKEND_URL: process.env.BACKEND_URL || "https://ubiquitous-computing-machine-r4r74vvwxrj7hxwv-3001.app.github.dev/",
			message: null,
			auth: localStorage.getItem('token') || false,
			user: null,
			email: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			logout: () => {
				localStorage.removeItem('token')
				setStore({"auth":false, token:null})
			},
			getUserData: async () => {
				try {
					const resp = await fetch('https://ubiquitous-computing-machine-r4r74vvwxrj7hxwv-3001.app.github.dev'+'/api/protected', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json', 
							'Authorization': `Bearer ${localStorage.getItem('token')}` 
						},
					});
			
					if (!resp.ok) throw new Error('Error fetching user data');
			
					const data = await resp.json();
					console.log('User data:', data);
			
					setStore({ user: data.user });
				} catch (error) {
					console.error('Fetch error:', error);
				}
			},
			register: async formData => {
				try {
					const resp = await fetch('https://ubiquitous-computing-machine-r4r74vvwxrj7hxwv-3001.app.github.dev' + '/api/register', {
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(formData)

					})
					if (!resp.ok) throw new Error('Error registering')
					const data = await resp.json()
					console.log(data)
					localStorage.setItem('token', data.token)
					setStore({ auth: true, token: data.token })
				} catch (error) {
					console.log(error);
				}
			},
			login: async formData => {
				try {
					const resp = await fetch('https://ubiquitous-computing-machine-r4r74vvwxrj7hxwv-3001.app.github.dev'+'/api/login', {
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(formData)
					})
					if (!resp.ok) throw new Error('Error login')
					const data = await resp.json()
					localStorage.setItem('token', data.token)
					console.log(data)
				} catch (error) {
					console.log(error);
				}
			},
			getPrivate: async () => {
				const token = localStorage.getItem('jwt-token');
				const resp = await fetch(`${BACKEND_URL}/api/login`,{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
					}
				});

				if (!resp.ok) {
					throw Error("There was a problem in the login request")
				} else if (resp.status === 403) {
					throw Error("Missing or invalid token");
				} else {
					throw Error("Unknown error");
				}

				const data = await resp.json();
				console.log("This is the data you requested", data);
				return data
			}
		}
	};
};
export default getState;
