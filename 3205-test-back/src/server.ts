const PORT = 3000;
import express, { Request, Response } from "express";
import cors from "cors";
import data from "../data.json";
interface SearchResult {
  email: string;
  number: string;
}
let currentTimestamp: number;

const server = express();
server.use(cors());

server.get("/search", (req: Request, res: Response) => {
  const queryEmail = req.query.email as string;
  const queryNumber = req.query.number as string | undefined;
  const queryTimestamp = req.query.timestamp as string;
  currentTimestamp = Number(queryTimestamp);

  setTimeout(() => {
    if (currentTimestamp === Number(queryTimestamp)) {
      res.send(find(data, queryEmail, queryNumber));
    }
  }, 2000);
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

function find(
  arr: SearchResult[],
  email: string,
  num: string | undefined
): SearchResult[] | null {
  const numParsed = num ? num.replaceAll(/-/g, "") : null;

  const result: SearchResult[] = arr.filter((el: SearchResult) => {
    if (
      el.email === email &&
      (numParsed ? el.number.indexOf(numParsed) >= 0 : true)
    ) {
      return el;
    }
  });
  return result;
}
