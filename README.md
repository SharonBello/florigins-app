
# Florigins

Florigins is a unique web application that translates personal identity into a generative floral art piece. Users answer a series of questions about their heritage, identity, and preferences, and the application creates a unique, symbolic flower based on their answers.

This project represents a beautiful fusion of data visualization, personal storytelling, and generative art.

## Demo

**Live Demo:** [**https://florigins-app.pages.dev/**](https://florigins-app.pages.dev/)

## Acknowledgements

- [Creator-Designer - Yael Ortam](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2FYael_ortman%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEwOHdDMjNabHBYOTJWa1lHTQEexUdsnr5vB1dU4c6G-2iJQWb80k4LMYGzG7xsi8WEjw3ne21RA5XXbqAhDWA_aem_mFXQ1NzMTFa3xdTBdY3aUw&h=AT0RyuD2DmPzrIixpwG6fdTs3mo2AE-xxn_fnH1NCmyS1TmaAgHX53_hm7E9z8S2Osw3gT-dqpAOqCvo4A1q1B3luChznkb-TGGd2iAaDJU22mH57whyMYEI3hAP0_H9dvHDLTW8YAv96AD9TF8)

## Developer

- [CodeEffect - Sharon Bello](https://www.linkedin.com/in/sharon-bello-tech/)

## Screenshots

![Home Page](https://res.cloudinary.com/primap/image/upload/v1751227611/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225308_vgymbu.png)

![The Form Screen](https://res.cloudinary.com/primap/image/upload/v1751227614/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225450_wjkl7r.png)

![The Result Page](https://res.cloudinary.com/primap/image/upload/v1751227613/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225508_mctnti.png)

![The Flower Gallery Page](https://res.cloudinary.com/primap/image/upload/v1751227615/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225518_h6ybej.png)

![The Filtered Flower Gallery](https://res.cloudinary.com/primap/image/upload/v1751227621/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225617_p1bmqx.png)

![The Filtered Flower Gallery](https://res.cloudinary.com/primap/image/upload/v1751227617/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225540_hsgxc8.png)

![The Filtered Flower Gallery](https://res.cloudinary.com/primap/image/upload/v1751227616/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225556_myvk0j.png)

![The Filtered Flower Gallery](https://res.cloudinary.com/primap/image/upload/v1751227615/Florigins/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-29_225606_yurju5.png)

## Concept and Design

The original concept, design system, and all visual assets for this project were created by **Yael Ortam**.

The core of Florigins is its sophisticated design language where every aspect of a user's identity is mapped to a specific visual characteristic of their flower. This includes:

- **Petal Shapes & Colors:** Determined by geographic origins and cultural choices, with each country corresponding to a unique color gradient and each continent to a distinct petal shape.
- **Center Shape & Accents:** Elements like gender identity, political views, religion, and diet are represented by unique SVG shapes and accent marks, layered together to form a complex, meaningful whole.
- **Data-Driven Uniqueness:** The result is a highly personalized data-driven portrait, ensuring that no two flowers are exactly alike, just as no two identities are.

## Technical Implementation

This project was brought to life using a modern, robust tech stack to handle its complex requirements. The code was executed by the development team based on the design vision.

### Core Technologies

- **React & TypeScript:** For a type-safe, component-based, and maintainable user interface.
- **Vite:** As a next-generation frontend tooling for a fast and efficient development experience.
- **SCSS:** For advanced, modular, and maintainable styling.
- **Firebase/Firestore:** As the backend to store user-generated flowers, enabling a persistent and shared gallery experience.

### Technical Complexity

The execution of this project involved several complex technical challenges:

- **Generative SVG Engine:** The `Flower.tsx` component is the heart of the application. It contains a complex rendering engine that programmatically constructs a detailed SVG based on over a dozen different data points from user answers. This required careful management of SVG layers, unique ID generation for gradients and filters to prevent rendering conflicts, and precise `transform` calculations for positioning each element.

- **Dynamic Statistical Analysis:** The results page features a dynamic statistical description that compares the user's new flower to the entire database of existing flowers. This logic (`ResultScreen.tsx`) intelligently finds the most interesting combination of shared traits (from a pool of over 10 possibilities) and constructs a grammatically correct, gender-aware sentence in Hebrew to reflect the user's connection to the community.

- **Responsive and Interactive Gallery:** The `GalleryScreen.tsx` provides two distinct, complex layouts: a beautiful, organic "bouquet" of all flowers when no filter is active, and a clean, grouped layout for when users filter by specific traits. This required conditional styling and a robust state management approach to handle the different user interactions smoothly.

- **Canvas & PDF Generation:** The application includes functionality to export the user's unique flower as a high-resolution PDF and shareable PNG, using `html2canvas` and `jsPDF` to capture and compose the final output.

## Setup and Running the Project

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone [your-repository-url]
    ```

2. **Navigate to the project directory:**

    ```bash
    cd florigins-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up Firebase:**
    - Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
    - Enable the Firestore database.
    - Copy your Firebase configuration object into the `firebase.ts` file.
5. **Run the development server:**

    ```bash
    npm run dev
    ```

This will start the application, typically on `localhost:5173`.

## License

All rights reserved to Yael Ortam
