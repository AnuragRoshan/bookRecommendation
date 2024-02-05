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
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2024-02-02_at_00.52.51_d34f656a1706815526-removebg-preview.png?updatedAt=1706815794127"
                alt=""
                srcset=""
              />
              <div className="image-desc">9-12</div>
            </Link>
          </div>
          <div className="list-img">
            <Link to="/allCard/6/8" className="cat-card">
              <img
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2024-02-02_at_00.52.51_57b39bc91706815578-removebg-preview.png?updatedAt=1706815793951"
                alt=""
                srcset=""
              />
              <div className="image-desc">6-8</div>
            </Link>
          </div>
          <div className="list-img">
            <Link to="/allCard/3/5" className="cat-card">
              <img
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2024-02-02_at_00.52.50_546d12061706815593-removebg-preview.png?updatedAt=1706815793981"
                alt=""
                srcset=""
              />
              <div className="image-desc">3-5</div>
            </Link>
          </div>
          <div className="list-img">
            <Link to="/allCard/0/2" className="cat-card">
              <img
                src="https://ik.imagekit.io/i3divn77k/Book%20Recom/WhatsApp_Image_2024-02-02_at_00.52.50_e4efec7f1706815560-removebg-preview.png?updatedAt=1706815794066"
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
