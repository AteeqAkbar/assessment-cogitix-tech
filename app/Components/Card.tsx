"use client";

interface CardProps {
  name: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ name, imageUrl }) => {
  return (
    <div className="card-neumorphic p-5">
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="img-neumorphic w-full h-52"
      ></div>
      <div className="mt-6">
        <div className="mt-6 text-center">
          <span className="tag-neumorphic inline-block p-2 rounded-full text-lg font-medium text-gray-600 mb-1 mr-2">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
