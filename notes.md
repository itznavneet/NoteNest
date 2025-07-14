axios.post(url, data, config);

//🧠 Why JSON.stringify() and JSON.parse()?
🔒 localStorage stores only strings.
When you do this:

js
Copy
Edit
localStorage.setItem("event-noter-user", JSON.stringify(user));
You're converting the user object into a string so it can be stored. Example:

js
Copy
Edit
const user = { name: "Navneet", email: "navneet@example.com" };
Becomes this string:

json
Copy
Edit
'{"name":"Navneet","email":"navneet@example.com"}'
📥 Later, when you get it back:
js
Copy
Edit
const user = localStorage.getItem("event-noter-user");
You now have this:

js
Copy
Edit
'{"name":"Navneet","email":"navneet@example.com"}' // Still a string!
So to convert it back into a real JavaScript object, you need:

js
Copy
Edit
return user ? JSON.parse(user) : null;

//🔄 Kab render hota hai?
React component har baar render hota hai jab:

Condition	Example
1️⃣ Component first time page par aata hai	Jab tum Home.jsx kholte ho
2️⃣ useState() ya useContext() se koi value change hoti hai	setUserName("Navneet") call kiya
3️⃣ Parent component fir se render hota hai	Agar parent mein kuch badla
4️⃣ Props change hote hain	Parent ne child ko naye data diye


//Operation Type	When to Run	Where to Use
axios.post()	User triggers manually (e.g. form submit)	Call inside event handler (onSubmit)
axios.get()	Run automatically when page loads	Use in useEffect to run on component render

