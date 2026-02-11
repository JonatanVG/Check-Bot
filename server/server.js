import express from "express";
import supabase from "./config/supabase.js";

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('DBChecker website items')
      .select('name, content')
      .eq('page', 3)
      .order('id', { ascending: true });
    
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data from Supabase");
    } else {
      console.log("Data fetched successfully:", data);
      res.render('index', { title: 'IRF Checker Bot', items: data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/Privacy-Policy", async (req, res) => {
  const { data, error } = await supabase
    .from('DBChecker website items')
    .select('id, name, content')
    .eq('page', 1)
    .order('id', { ascending: true });
  res.render('Privacy-Policy', { title: 'Privacy Policy', items: data });
});

app.get("/Terms-of-Service", async (req, res) => {
  const { data, error } = await supabase
    .from('DBChecker website items')
    .select('id, name, content')
    .eq('page', 2)
    .order('id', { ascending: true });
  res.render('Terms-of-Service', { title: 'Terms of Service', items: data });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});