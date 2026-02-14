"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import PostCard from "./_components/PostCard";

const mockPosts = [
  {
    id: 1,
    title: "Public Speaking",
    authorName: "Mahesh Lamsal",
    wantsToLearn: ["Design", "Cooking"],
    imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPEBASEBIWEBURERcXEhEVFhUQFhcSFREXFhYVExUYHSggGBolGxMVITEjJSkrLjAvHR8zODMtNystOisBCgoKDg0OGxAQGy0lHyYvMC0tLy0tLS8tLi0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYCAwQBBwj/xABDEAACAQIDBAcEBwYDCQAAAAAAAQIDEQQSIQUxQVEGE2FxgZGhIjLB0QcUFUJScrEjM1OCkuFik6IWJENkc5Sy4vD/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EADERAQACAQMCBAQEBgMAAAAAAAABAgMEERIhMQUTQVEiMmFxFIGRoQZCUrHB8BUzQ//aAAwDAQACEQMRAD8AgCi8uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxc1dK6u1dLjZWu7ctUNmdp239GQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU2W13Txk6rWZJuDjx6tO2nbpfzL8YItiiI793ajTxbBFI+/wCawUtu4eSv1ij2STi/0Ks4MkejnW0eWPRn9s4f+LH1+Rjyb+zH4XN/S6MNi6dW/VzjO2+zu13rgaWpNe8I74r0+aNm8wjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACm9INlThUnOMXKE25XSbs3q0+WtzoafNE14z6O1pM9b0is94RtPA1ZO0aU5PkoSb9ETzkrHeV6KWn0SeH6I46orxwtT+ZKn/wCbRDbV4a97Ja6XLbtWXBh6s8LWvb2qcnGUb3XJxbi7MktWMtVbNii9ZpZbdjbYjibq2ScVdxve63XTKGXDONxdRpZxde8JMhVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYG7BYerUqRVBwjNO+eonKMUt8sq95rSy52vpc1vata727Oh4XgnNqa1j06/otuHwmIWFnSninOrKMksSoKDTl7rUE7XXec+2Wk5ItEdPZ7+uK8Y5rNuvvs5Nn4bG0X1dessVTqRko1urVKpTlldnJJ2lDt1aduG6W84rfFWNp/uipXNXetrco9/WHxHE4aVKc6dRZZU5OMlyadmelpaLVi0dnnbVmszEpTonTbxF1ujCV/GyS836EGqn4FHXzEYtlyOe4oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDr2XG9RxzSp5qc454PLOOaDWaL4NbyPLbjXf6ur4Jj8zWVp7xP9lyhiHUqJXb6ujCMpN3cpNJZpvjO1O7f+Io578/j223e9xYfKrw332aqU+pjKmpTmp151W6knUalNJOML+7BZdIm1805KRWfRtp9FWlrZInu+ddItjrH7Yq0oPIoUYSrSis0naMV7K0Tk88I6vt4HU0+byNLFp9+jjajB52rmtfzdNDYMMEvYc31kpXVRRjOLpvLleVtNa3TXM0nUTm7uD45ppwXrG+8TDYYcIMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI9HrfWIJ8VJeOVv4EGo+SXW8Dvw1tJ+8LLg5UMsq0cZhqUJyzVOtq04yjLKouEk5JwaUUsrTdzT8HltEbx+72dvEcMb992vAbWo4qtUjh81SnSjH/eHCUIVJyctKWZXcUo7+N+W+LUaeMNY67yk02qvmmfh2r6I1YOns+vXxU5TrSxlVRsoxXVpRnPnqvZS8jbzJz0jHHTiq6jJj0PLPk67zsido4vrp3StFXyp79W22+1ttlnHThGzxfiOunWZufaI6RDlJFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbMNWdOcJr7kk/J6ryNbV5VmEuDLOLLXJHpO6d/2JwVXFPFz6x55Z1Tg6ag5Ne880W9W83eQU180x+XePo9/Gmre9c+Pbaeu09k3VnRw0HJ2owW9yk3d9snrJ93gilaZy26Q6UctvineUft69XCuWVxtKMknpLLe15LhpJuxLg+HLs4vj+Ob6OZ9piVTOg8GGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASeAlTrRVGolCX/DqpcW/dnz3kGTlWedf0dfR30+oxxps0cZ/lt/iXDi8NKlJwmrNeTXNc0S0tFo3hz9Rp8mnyTjyRtMf7u6ds4ONGooxvbInd63bbTfoR4ck3rvK14npK6XNGOvWOMS4SZzgAAA7cPtatTioxnaK3K0XZdjaIbYKWneYdHB4rqsFIpS3ww79gbDqTnHEYyTqTWtKEnmy8ptbk+KS3b9+6vmzRWOFI2930PFeMmOt49Y3XXBbNVdPrFem001+K6s0Z0WmnJblPZQ8R1Fa45xd5mP2fLsXVpRxFajCebq6s4xvo5KE3G65nSvhtX7PBZtNbHP09wiVwAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI9H6KnXimk0oybTV1orLTvaINRMxSdnU8Gw1y6ytbRvHWf0du3cHGXtpKM88IuSpuMrSkopVUt8XfSXBq2mpFhtMdPR7LxHQ01eKaz0mO0tnSXCKFGi73cLQvzWX/19WY0997z9XE8e0lcenxTv1r8P3jZXS68oAAPJySV20lzegiJnszETPZxxx8Z1aVGn7UqtWEL8Fnmo37feLNNNaes9FzForW636Q+ubQxWFjioUZVVCcrJ07Stdr2U5pZYtq298uZUz6XHbNHXb3h7LSZM9dLM1rvEdpTNd5YqK0zNRXCyteTXdFSfgdKlYrG0dnGvabTvL82Y+t1lWVX+JVm/CpJyXrlLCPu6qG0akOOZcpa+u8ivp6W+irfS47/AESFHa8H7yce33l6a+hVtpbR26qd9FePl6u6lWjNXjJSXNO5Xmsx3VbUtXpMMzDUAAAAAAAAAAAAAAAAAAAAAAAAAADq2Zi+pqKTTaacZJOzyvfZ89zI8lOddl3w/V/hc8ZJjeO0/aVhns1V403DETcIPNDXM7r3Yzm/alBNJuMrttK70Kfm8JmJr1fQcN6Z6RfHbeqP6U1ZOVKMrK0L2Wqzt2lZ8dyJdLEbTMPLfxLe/m0pPbbf80IW3mgCL2ntFweWFtPelv15ItYMEWjlZe02li0crIqpUlJ3k3Lvdy7Wla9odCtK1jasJToTSz7Swa4/WIv/AC71Ff8ApuZt2Sr9t3ZFOttOlQzO1SMeue+Up2lOWvDMkl2X0ObeKzqIiXoMF8lPDrWienb9Vx2zLqMPiazd1RwtVw3tq0HJ3b3+7BJ79HzLsd3AfnOUNIxvZaa8VZqy8+JNLEN7QasJau3n8gzDs2XVy1Y8pey/Hd62IdRTlRW1VOWOfosRzHGAAAAAAAAAAAAAAAAAAAAAAAAAAAASew+kOFwXXPEOc5WjkoU1fM9buT0UXu3taPiSU0tc3W0dnY8Lz5cHKaTtEonbfTWeNqU06VOhShJ5YxvKdpaNynouTskt3Et301YptWG+si2eszad5hmUHEc+OxHVwb47ortJMWOb22S4cU5L7K3Ud9e1N/1Js6kRtGzuVjboxq1YwV5Oy/8AuBlmIWP6NI59p4JrXWrJ/wDa1fiYt2ln1XL61m2wpf8ANKC7l+y+Bxq231O71mTFx8L2+m/7rJ9IuI6vZeLf4oRh/m1YU36SZ1a93lJfA62rjHnK77o6/rbzJWsNwYYQ4vm38l6IMyyTtqt61XehMbxsxMbxstVKeaKkvvJPzVzj2jadnAtXjaYZGGoAAAAAAAAAAAAAAAAAAAAAAAAAAEJ0gw+sKkU96Ukna/K/hfyRc0l/5XS0OTvSUY0Xl9ZNm189OLe9ey+9f2scrNTjeYcXU4+GSYRO0sT1k9Pdjoviy7p8fGu895dHS4uFN57y4qr9l30ureLXDmydahy18L1rUm8q5b3bfv3Jhtvsun0UwS2lQ4KMK3pSmjS/YiN7JLA4i+Ko1PxYmnJ/zVot/qcLDO+WJ+r3Ospto7V9q/2Wj6X8Rk2fGH8XE04+EYzqfrTR3KR1eFl8XV3NtcFbnq9Xx/KSHo2JviGOhT3Ls08tDJIwJ/Y9TNSS/C2vivRnM1Ndr/dx9ZXjl393cQKoAAAAAAAAAAAAAAAAAAAAAAAAAAGnF0eshKPNad+9eptjtxtEpMV+F4srJ199+sO7ExLOGO6mMleynZdq7UuOjZFkxxaYmUd8EZLRM+jVdvcrLm9X5EiXpDpwGEzyvJ6R96b4LkuCv2EWbJwjp3Q5s3COndrrwUZSS0Sk0t60vpv7CTHO9YlvjnesTK3fRfsrEVsU6tGlKVNUa0VWacaeeVGUYrrHo3ndrK7RplmOMws4dovWbdt1v2l0Hng8K8ROpnnRlTk6cF7KgqkczzPV2Wt7LRM5ePT8Zid+r0ObxeuWLY+O1Zifv9EZ9MePhOlglCcZxlUrTzRakv2ajDRrtnJHWpHd5mXy+ktNd71fjrb4G7Eswwwi7Sa5q6/R/DzDPoyDEJPYVS0px5q/in/cqauvSJUddT4Ysmii5gAAAAAAAAAAAAAAAAAAAAAAAAAAACt7Vp/tp5dFo27feau0vNeZ0dPabUdrS2nyo3cNeCUJ9sbc229F2vUn9FmJ6t+EpTqOMY6NrVvXdvduCNb3itd5R5b1pE2l9B6IdCp4xN05RjGnK0qs3mkpOKbywXY+xHOm1sk7y59KZdVMzExEPoOyPo3wFCXWVKf1qo9c1b2oJ/4aXu8ON2TVvNaxWHVw4Ix0iu+64RVkktEtElokuSRqnYYijGpCUJrNGcXGUXucZKzT8GzMTsPzN0yU6WJlgpu6wzko905vO+5qEH/MXqzugmNkSbNHhgbMPhuskkt8Yya/p3edjTJfhESjyZPLru1m6R0YCplqwfbZ9z0+JHmrypKHUV5Y5hZDlOIAAAAAAAAAAAAAAAAAAAAAAAAAAAQELpiaUpQTvGrPTi1m3LwcfItY7+XeN+0ujW3k5Ii3aYhFVIvPSjZ3lOyW7Wz337y5NoiN1/lHGbb9FlwGDVKNt7fvP4LsOdlyzklxs+ecs/Refox2n1WLdGT9nERsv+pC8o+azryNcc7Sn8Py8cvH0l9YJndAAHw/6XejdSrtKGKwkeujVoqNdQcW4zp+ym1fjHJovws2x6rFXpNobzpcto3isvn04tNpppp2aaaafJp7i9ExMbwpzExO0vAw7tjyjGcpSajaO9u2ra+RX1UTNYiFTWVtasRWHFjX+0m6dnG91o7u+r0drWfeSY+UUiJWMETwjl3aqc78Gu3+29eRJ36JZhbKFTNGMvxRT80ci9eNph5/JXjaYZmrQAAAAAAAAAAAAAAAAAAAAAAAbqFaME8yb7lmI7VmezteEZdNTlXPt17bwfalDjfxg/kY8u70kYdLMb8I/R6tqYfn/ol8jHl3Pw2l/oj9GFHGYWCtDLFN3sqclq970iZmMk9y2m0t/mrD2eLwsnFyytw91uErq/L2dBEZI7MRpNLETEVjqz+vYb8Uf6ZfIxtkaf8AH6L+iD7RpU/bpTUakPapySd1OOsWrq29LeZrGTc/AaOOsVjf81v2Z9KE5QUK9OMZ6Lr43cHrvlT4eDt3FuL+6G+mmPlXjZHSGlXUbtQlLdreEvyS+D9TdWnp0lp6XVXGmlnlFNO8Yxvd3STlLlqla2rZT1czx/395dDw+sTfrEfn/iFUw737/F3fil7Kfccm3R3ETt/oxSxjU23SqKydSKTco/hmuPY967tC5pddfB07wparQ0z9e0qd0x6PwwX1WVKU5Qr0pO82pNVackpq8Ulb248ODPR4snmVizzWbFOK80n0V0kRvDAW4mYFh2Wn1ML9vlmdvQ5WfbzJ2cbVbebOzrIlcAAAAAAAAAAAAAAAAAAAAAAAAN2Fw8J5s0Yy3b0mR3mY7PSeATM84nt0dH2fS/hx8jTnb3el4R7PPs2j/DXqviY8y3uxwr7PHsqj+D1l8x5tjhV59kUX9z/VL5mfNsz5dVfxuHUak1HRKTSW/wBSzS28dVa1evRojNx+RttEtd0lsza9Si/2crX3wesX3r4qzG81YtSt+6+7I6ZQxEFRrtx/DGUnZSs0nCenP3ZeAvFckcZQVrfBblXq3bV6QbJwSarYmpWm4vLhqEbTiraXy6J6rfJJ8jOPSY4jbbf7tcuuy2nffZ89odPcZ1eXq6TknZVJqSbjwlKEJWzd1l2CfCsczvvMfRvHiuWI22hj0j6WLF4fD4d0cjp1HUlW6y6zyU88Iwy+zBueZXb3JF/FjjHHGOyhmyzmtynur2Dkq01CDV3fu07UbXyRWN5Vstox15T2TFLY6+/JvsWnqypbVz6Q599dP8sOylgqcN0V3v2n6kFs17d5Vr6jJbvLoI0IAAAAAAAAAAAAAAAAAAAAAAAAAOvZ/wB7w+JFkek/h7vk/J2oienAw9MbD0w2hWMf+9qfnf6lynywq27y0OKe823a7NFSjbdqbbtZghWa36oTU5bPalCNTXc7WvxstyfYb481sf2RZNPTJ17S4a9B0/e3Pc+Bex5q37Odl098fdpqRb0smuXzJJRQ37ObjVp8s1n3NW5dpFmjekodTHLFZZzluEAAAAAAAAAAAAAAAAAAAAAAAAAAAA7Nn/e8PiRZHpf4e/8AT8nYkRPTPQPTDAYZhWMf+9qfnZcp8sK1+7SjZgA49pVlSg52vZpW3b2SYqza2yLLfhXkjae177qcnblqWZ00+6tGrj2Y7Q2nKrSlDq5pu2rXJp6+Qx6fjblu1y6qL047NGzqs23GV7JaNp33rS5aUpd6lZp8nfyMTG8bNJjeJhak7nHl5+e70MAAAAAAAAAAAAAAAAAAAAAAAAAAAdmzl73h8SHK9L/D3fJ+TsInpnoHpgh4GVZx/wC9qfnf6lynywq37tBs1egRvSD9xL80f1J9P88K+q/60Fsudp24Na/BnRly57Jgw0Ay8aAsmAnmpQf+G3itPgcrNG15hw9RXjkmG8jQgAAAAAAAAAAAAAP/2Q==",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahesh",
  },
  {
    id: 2,
    title: "Guitar Basics",
    authorName: "Sarah Chen",
    wantsToLearn: ["Music", "Art"],
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 3,
    title: "Digital Marketing",
    authorName: "John Doe",
    wantsToLearn: ["Tech", "Marketing"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 4,
    title: "Yoga Fundamentals",
    authorName: "Emily Wang",
    wantsToLearn: ["Fitness", "Cooking"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 5,
    title: "Photography 101",
    authorName: "Alex Kim",
    wantsToLearn: ["Art", "Tech"],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: 6,
    title: "Public Speaking",
    authorName: "Mahesh Lamsal",
    wantsToLearn: ["Design", "Cooking"],
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74dea9f2672?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahesh",
  },
  {
    id: 7,
    title: "Guitar Basics",
    authorName: "Sarah Chen",
    wantsToLearn: ["Music", "Art"],
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 8,
    title: "Digital Marketing",
    authorName: "John Doe",
    wantsToLearn: ["Tech", "Marketing"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 9,
    title: "Yoga Fundamentals",
    authorName: "Emily Wang",
    wantsToLearn: ["Fitness", "Cooking"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 10,
    title: "Photography 101",
    authorName: "Alex Kim",
    wantsToLearn: ["Art", "Tech"],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: 11,
    title: "Public Speaking",
    authorName: "Mahesh Lamsal",
    wantsToLearn: ["Design", "Cooking"],
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74dea9f2672?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahesh",
  },
  {
    id: 12,
    title: "Guitar Basics",
    authorName: "Sarah Chen",
    wantsToLearn: ["Music", "Art"],
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 13,
    title: "Digital Marketing",
    authorName: "John Doe",
    wantsToLearn: ["Tech", "Marketing"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 14,
    title: "Yoga Fundamentals",
    authorName: "Emily Wang",
    wantsToLearn: ["Fitness", "Cooking"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 15,
    title: "Photography 101",
    authorName: "Alex Kim",
    wantsToLearn: ["Art", "Tech"],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];

const ITEMS_PER_PAGE = 6;

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "title">(
    "recent",
  );
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = mockPosts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Skills</h1>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <button
              onClick={() =>
                setSortBy(
                  sortBy === "recent"
                    ? "popular"
                    : sortBy === "popular"
                      ? "title"
                      : "recent",
                )
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline capitalize">{sortBy}</span>
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-c5 text-white rounded-full hover:bg-purple-700 transition-colors font-medium">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Create Post</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Design",
                "Music",
                "Tech",
                "Cooking",
                "Art",
                "Fitness",
                "Marketing",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-c4 hover:text-c5-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              authorName={post.authorName}
              wantsToLearn={post.wantsToLearn}
              imageUrl={post.imageUrl}
              avatarUrl={post.avatarUrl}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No skills found matching your search.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
