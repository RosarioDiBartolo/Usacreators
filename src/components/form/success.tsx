import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function SuccessStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6"
    >
      <Card className="relative overflow-hidden border-green-400 bg-gradient-to-r from-green-50 to-green-100 shadow-lg rounded-2xl">
        {/* Confetti sparkles */}
        <Sparkles className="absolute top-4 left-4 w-6 h-6 text-yellow-400 animate-bounce" />
        <Sparkles className="absolute top-4 right-4 w-6 h-6 text-pink-400 animate-bounce" />
        <Sparkles className="absolute bottom-4 left-1/3 w-6 h-6 text-blue-400 animate-bounce" />

        <CardHeader className="flex flex-col items-center space-y-2">
          <CheckCircle className="w-14 h-14 text-green-600" />
          <CardTitle className="text-2xl text-green-700 font-bold text-center">
            🎉 Subscription Successful!
          </CardTitle>
          <CardDescription className="text-center text-green-600 max-w-xs">
            Thank you for subscribing! Our platform is still developing, and we'll notify you via email about updates. Feel free to check back from time to time.
          </CardDescription>
        </CardHeader>

    
        <CardContent className="flex flex-col items-center space-y-4 mt-4">
          <p className="text-center text-green-700 font-medium">
            Don’t miss any updates! Join our Discord community to get real-time news and announcements.
          </p>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mt-2">
            <Button
              
              target="_blank"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Join our Discord
            </Button>

            <Button
              asChild
               className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <Link
              to={"/"}> 
              Go Back Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SuccessStep;
