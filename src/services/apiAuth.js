import { supabaseAuth } from "./supabase";

export async function signupUser({ email, password, fullName }) {
  let { data, error } = await supabaseAuth.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        picture: "",
        likedProducts: [],
        likedReviews: [],
        dislikedReviews: [],
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error("There was a problem while signing up. Try again");
  }

  return data;
}

export async function loginUser({ email, password }) {
  let { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signupWithGoogle() {
  const { data, error } = await supabaseAuth.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

export async function logoutUser() {
  const { error } = await supabaseAuth.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  // CHECK IF THERE IS AN ACTIVE SESSION
  const { data: session } = await supabaseAuth.auth.getSession();

  // IF THERE IS'T AN ACTIVE SESSION RETURN NULL
  if (!session.session) return null;

  // IF THERE IS AN ACTIVE SESSION NOW AND ONLY NOW FETCH CURRENT USER FROM SUPABASE
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  return user;
}

export async function updateUserById({ id, data }) {
  let updatedField;

  updatedField = {
    user_metadata: {},
  };

  const { data: user, error } = await supabaseAuth.auth.updateUserById(
    id,
    updatedField
  );

  if (error) throw new Error("User could not be updated");

  return user;
}
