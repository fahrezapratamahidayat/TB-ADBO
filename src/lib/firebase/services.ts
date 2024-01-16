import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { app, storage } from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function RegisterUser(data: {
  username: string;
  password: string;
  email: string;
  createdAt?: Date;
  phone: number;
  role?: string;
}) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exists",
    };
  } else {
    data.createdAt = new Date();
    data.password = await bcrypt.hash(data.password, 10);
    data.role = "admin";
    try {
      await addDoc(collection(firestore, "users"), data);
      return {
        status: true,
        message: "User created successfully",
        statusCode: 200,
      };
    } catch (error) {
      return {
        status: false,
        message: "register failed",
        statusCode: 400,
      };
    }
  }
}

export async function LoginUsers(data: { email: string; password: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (users) {
    return users[0];
  } else {
    return null;
  }
}

export async function uploadStory(data: {
  userId: string;
  username: string;
  email: string;
  desription: string;
  location: string;
  createdAt?: Date;
  photoUrl: string;
  likes: number;
  comments: string[];
  status: boolean;
}) {
  data.createdAt = new Date();
  data.likes = 0;
  data.comments = [];
  data.status = false;
  try {
    await addDoc(collection(firestore, "stories"), data);
    return {
      status: true,
      message: "Story uploaded successfully",
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Upload failed",
      statusCode: 400,
    };
  }
}

export async function postLike(storyId: string, userId: string) {
  try {
    // Mendapatkan referensi dokumen cerita berdasarkan storyId
    const storyRef = doc(firestore, "stories", storyId);

    // Mendapatkan data cerita saat ini
    const storyDoc = await getDoc(storyRef);
    if (!storyDoc.exists()) {
      return {
        status: false,
        message: "Story not found",
        statusCode: 404,
      };
    }

    // Menambahkan like ke cerita
    const currentLikes = storyDoc.data().likes;
    await updateDoc(storyRef, {
      likes: currentLikes + 1,
    });

    return {
      status: true,
      message: "Like added successfully",
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Failed to add like",
      statusCode: 400,
    };
  }
}

export async function getStories() {
  const q = query(collection(firestore, "stories"));
  const querySnapshot = await getDocs(q);
  const stories = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return stories;
}

export async function changePassword(userId: string, newPassword: string) {
  try {
    const userDocRef = doc(collection(firestore, "users"), userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await updateDoc(userDocRef, { password: hashedPassword });

      return {
        status: true,
        message: "Password changed successfully",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "User not found",
        statusCode: 404,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Password change failed",
      statusCode: 400,
    };
  }
}

export async function updateUser(
  userId: string,
  newData: {
    username?: string;
    email?: string;
    phone?: number;
    gender?: string;
    profileUrl?: string;
  }
) {
  try {
    const userDocRef = doc(collection(firestore, "users"), userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      await updateDoc(userDocRef, newData);

      return {
        status: true,
        message: "User updated successfully",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "User not found",
        statusCode: 404,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "User update failed",
      statusCode: 400,
    };
  }
}

export async function getUserId(id: string) {
  try {
    const snapshot = await getDoc(doc(firestore, "users", id));
    if (!snapshot.exists()) {
      return {
        status: false,
        message: "User not found",
        statusCode: 404,
      };
    }
    const data = snapshot.data();
    return {
      status: true,
      message: "User found",
      statusCode: 200,
      data,
    };
  } catch (error) {
    return {
      status: false,
      message: "User not found",
      statusCode: 404,
    };
  }
}

export async function postComment(
  storyId: string,
  data: { username: string; comment: string; profileUrl: string }
) {
  try {
    // Mendapatkan referensi dokumen cerita berdasarkan storyId
    const storyRef = doc(firestore, "stories", storyId);

    // Menambahkan komentar ke cerita
    const storyDoc = await updateDoc(storyRef, {
      comments: arrayUnion(data),
    });

    return {
      status: true,
      message: "Comment added successfully",
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Failed to add comment",
      statusCode: 400,
    };
  }
}

export async function getStoryId(id: string) {
  try {
    const snapshot = await getDoc(doc(firestore, "stories", id));
    if (!snapshot.exists()) {
      return {
        status: false,
        message: "Story Not Found",
        statusCode: 404,
      };
    }
    const data = snapshot.data();
    return {
      status: true,
      message: "Story Found",
      statusCode: 200,
      data,
    };
  } catch (error) {
    return {
      status: false,
      message: "Story Not Found",
      statusCode: 404,
    };
  }
}

// export async function uploadStory(data: {
//   userId: string;
//   username: string;
//   email: string;
//   description: string;
//   location: string;
//   : File;
//   createdAt?: Date;
// }) {
//   data.createdAt = new Date();

//   try {
//     // Upload foto ke Firebase Storage
//     const storageRef = ref(storage, `story_photos/${data.userId}_${Date.now()}`);
//     await uploadBytes(storageRef, data.photoFile);

//     // Dapatkan URL unduhan foto
//     const photoURL = await getDownloadURL(storageRef);

//     // Tambahkan data cerita ke koleksi "stories" bersama dengan URL foto
//     await addDoc(collection(firestore, "stories"), {
//       userId: data.userId,
//       username: data.username,
//       email: data.email,
//       description: data.description,
//       location: data.location,
//       photoURL: photoURL,
//       createdAt: data.createdAt,
//     });

//     return {
//       status: true,
//       message: "Story uploaded successfully",
//       statusCode: 200,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: false,
//       message: "Upload failed",
//       statusCode: 400,
//     };
//   }
// }
