// import type { Metadata } from "next";
// import { books } from "@/config/books";

// export const metadata: Metadata = {
//   title: "Books — Sanyam Aggarwal",
//   description: "Books I've read and recommend.",
// };

// export default function BooksPage() {
//   return (
//     <div className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
//       <div className="space-y-1">
//         <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
//           Books
//         </h1>
//         <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
//           What I've been reading. Always updating.
//         </p>
//       </div>

//       {books.map((cat) => (
//         <div key={cat.category} className="space-y-3">
//           <h2
//             className="text-xs font-semibold uppercase tracking-widest"
//             style={{ color: "var(--muted-foreground)" }}
//           >
//             {cat.category}
//           </h2>
//           <div className="space-y-px">
//             {cat.items.map((book) => (
//               <div
//                 key={book.title}
//                 className="flex items-center justify-between py-2.5 border-b"
//                 style={{ borderColor: "var(--border)" }}
//               >
//                 <div>
//                   <p className="text-sm" style={{ color: "var(--text-primary)" }}>
//                     {book.title}
//                   </p>
//                   <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
//                     {book.author}
//                   </p>
//                 </div>
//                 {book.year && (
//                   <span className="text-xs tabular-nums" style={{ color: "var(--text-dim)" }}>
//                     {book.year}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import type { Metadata } from "next";
import { books } from "@/config/books";

export const metadata: Metadata = {
  title: "Books — Sanyam Aggarwal",
  description: "Books I've read and recommend.",
};

export default function BooksPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="mb-12">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Books
        </h1>

        <p
          className="text-base"
          style={{ color: "var(--muted-foreground)" }}
        >
          A collection of books that have influenced my thinking and growth.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-14">
        {books.map((category) => (
          <section key={category.category}>
            {/* Category Title */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--muted)",
                }}
              >
                📚
              </div>

              <h2
                className="text-3xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {category.category}
              </h2>
            </div>

            {/* Book Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {category.items.map((book) => (
                <div
                  key={book.title}
                  className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <h3
                    className="text-xl font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {book.title}
                  </h3>

                  <p
                    className="text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {book.author}
                  </p>

                  {book.year && (
                    <p
                      className="text-xs mt-4"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {book.year}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
