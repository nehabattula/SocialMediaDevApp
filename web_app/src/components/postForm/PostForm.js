import React from "react";
import "./PostForm.scss";
const PostForm = () => {
  return (
    <section className="section">
      <div>
        <h1 className="text-center">HOWLS FROM YOUR PACK </h1>
      </div>
      <div>
        <div>
          <div></div>
          <div class="card">
            <h3>ADD A HOWL !</h3>
            <form>
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Howl what's on your mind...."
                required
                className="text-area"
              />
              <br />
              <label>Select a language </label>
              <div>
                <select name="cars" id="cars">
                  <option value="Javascript">Javascript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Ruby">Ruby</option>
                </select>
              </div>

              <br />
              <input type="submit" className="button" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostForm;
