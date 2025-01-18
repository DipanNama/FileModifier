import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContentPage from "./content/content";

const root = document.createElement('div');
root.id = "__random-quotes-extension-root-container";
document.body.append(root);


createRoot(root).render(
    <StrictMode>
        <ContentPage />
    </StrictMode>
);