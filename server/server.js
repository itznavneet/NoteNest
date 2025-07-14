require("dotenv").config();
const express= require ("express")
const app =express();
const connectDb = require("./utils/db");
const authRoutes= require('./routers/auth-route')
const eventRoutes= require('./routers/event-route')
const cors= require('cors')

const corsOptions= {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

