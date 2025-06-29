const ProblemStatement = () => {
  return (
    <div className="flex-none w-1/4 min-h-[90vh] bg-green-300 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center h-full overflow-y-auto">
      <h2 className="text-3xl font-bold text-yellow-800 mb-4 text-center">
        Problem Statement
      </h2>
      <p className="text-lg text-yellow-700 leading-relaxed text-center">
        The goal is to create a responsive web layout with distinct sections for
        code editing and previewing, alongside a dedicated area for outlining a
        problem statement. The solution should be user-friendly, visually
        appealing, and maintain a consistent structure across various screen
        sizes. This aims to provide a comprehensive environment for
        demonstrating coding challenges and their solutions.
      </p>
    </div>
  );
};

export default ProblemStatement;
