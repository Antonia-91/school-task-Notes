export function start() {
  document.querySelector(".main-content").innerHTML = "";

  let startTamplate = `
<div class="start">
    <div class="start_text">
        <h2>Save Your Docuemts</h2>

        <p class="haeder-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            blanditiis accusantium numquam officia ab in veritatis harum eius
            facilis voluptates sit consectetur dolorum aliquid culpa. Quos odit sit
            maiores exercitationem.
        </p>
    </div>
    <div class="img">
        <img
            src="/FRONTEND/IMG_167C0677EF4A-1.jpeg"
            alt=""
            width="400px"
            height="400px"
            />
    </div>
</div>

`;

  document
    .querySelector(".main-content")
    .insertAdjacentHTML("beforeend", startTamplate);
}
