import { TriangleUpIcon } from '@radix-ui/react-icons';

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      <li className="feedback">
        <button>
          <TriangleUpIcon />
          <span>593</span>
        </button>
        <div>
          <p>B</p>
        </div>

        <div>
          <p>ByteGrad</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
            ad labore expedita voluptates blanditiis quae.
          </p>
        </div>

        <p>4d</p>
      </li>
    </ol>
  );
}
