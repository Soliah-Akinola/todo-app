import React from "react";

function ErrorTrigger(): never {
  throw new Error("This is a test error");
}

export default ErrorTrigger;
