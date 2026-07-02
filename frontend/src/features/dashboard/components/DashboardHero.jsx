import {

  Plus,

  CalendarDays,

  MessageSquare,

} from "lucide-react";



import HeroIllustration from "../../../assets/dashboard/hero-illustration.png";



export default function DashboardHero({

  userName = "Rahul",

  interviewsToday = 2,

  feedbackPending = 1,

  onCreateInterview,

}) {

  const getGreeting = () => {

    const hour = new Date().getHours();



    if (hour < 12) return "Good morning";

    if (hour < 17) return "Good afternoon";

    return "Good evening";

  };



  return (

    <section

      className="

      relative

      overflow-hidden

      rounded-3xl

      border

      border-slate-800

      bg-gradient-to-br

      from-[#181038]

      via-[#121827]

      to-[#0b1220]

      min-h-[320px]

    "

    >

      {/* Ambient Glow */}



      <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-violet-700/10 blur-[120px]" />



      <div className="relative grid h-full grid-cols-2 items-center px-14 py-12">



        {/* LEFT */}



        <div className="max-w-[560px]">



          <p className="text-sm text-slate-400">

            Welcome back

          </p>



          <h1 className="mt-2 text-[46px] font-bold leading-tight text-white">

            {getGreeting()}, {userName} 👋

          </h1>



          <p className="mt-5 text-lg leading-8 text-slate-400">

            Manage interviews, collaborate with candidates

            and review AI-generated interview reports from

            one beautiful workspace.

          </p>



          <div className="mt-10 flex gap-5">



            <div

              className="

              flex

              items-center

              gap-4

              rounded-2xl

              border

              border-slate-700

              bg-slate-900/40

              px-6

              py-4

            "

            >

              <CalendarDays

                size={22}

                className="text-violet-400"

              />



              <div>



                <p className="text-xs text-slate-500">

                  Today

                </p>



                <p className="font-semibold text-white">

                  {interviewsToday} Interviews

                </p>



              </div>



            </div>



            <div

              className="

              flex

              items-center

              gap-4

              rounded-2xl

              border

              border-slate-700

              bg-slate-900/40

              px-6

              py-4

            "

            >

              <MessageSquare

                size={22}

                className="text-indigo-400"

              />



              <div>



                <p className="text-xs text-slate-500">

                  Pending

                </p>



                <p className="font-semibold text-white">

                  {feedbackPending} Feedback

                </p>



              </div>



            </div>



          </div>



        </div>



        {/* RIGHT */}



<div className="relative flex items-center justify-between px-12 py-10">

          <button

            onClick={onCreateInterview}

            className="

            absolute

            top-6

            right-6

            inline-flex

            items-center

            gap-3

            rounded-2xl

            bg-indigo-600

            px-12

            py-4

            text-base

            font-semibold

            text-white

            transition-all

            duration-200

            hover:bg-indigo-500

            hover:shadow-xl

            hover:shadow-indigo-900/40

             

          "

          >

            <Plus size={50} />



            Create Interview



          </button>



          <img

            src={HeroIllustration}

            alt="Dashboard Illustration"

            className="

            mt-12

            w-[600px]

            object-contain

            select-none

            pointer-events-none

            drop-shadow-2xl

          "

            draggable={false}

          />



        </div>



      </div>



    </section>

  );

}

