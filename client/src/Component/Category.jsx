import React from "react";
import "../Styles/category.css";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="cat-top">
      <div className="cat-inner-top">
        <div className="cat-head">Show All Books By Age</div>
        <div className="cat-card-list">
          <div className="list-img">
            <Link to="/allCard/9/12" className="cat-card">
              <img
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2023-12-30_at_18.56.26_0f393ab8-removebg-preview.png?updatedAt=1704142814870"
                alt=""
                srcset=""
              />
              <div className="image-desc">9-12</div>
            </Link>
          </div>
          <div className="list-img">
            <Link to="/allCard/6/8" className="cat-card">
              <img
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2023-12-30_at_18.55.12_6dfa57ab-removebg-preview.png?updatedAt=1704142814883"
                alt=""
                srcset=""
              />
              <div className="image-desc">6-8</div>
            </Link>
          </div>
          <div className="list-img">
            <Link to="/allCard/3/5" className="cat-card">
              <img
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2023-12-30_at_18.56.26_37f49754-removebg-preview.png?updatedAt=1704142814921"
                alt=""
                srcset=""
              />
              <div className="image-desc">3-5</div>
            </Link>
          </div>
          <div className="list-img">
            <Link to="/allCard/0/2" className="cat-card">
              <img
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2023-12-30_at_18.55.45_9f5d1c7b-removebg-preview.png?updatedAt=1704142814932"
                alt=""
                srcset=""
              />
              <div className="image-desc">0-2</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
