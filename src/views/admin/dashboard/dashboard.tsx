import { EnvelopeIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  return (
    <section className="bg-[#6F4E37] py-16 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 font-[Playfair_Display]">
        <EnvelopeIcon className="w-10 h-10 mx-auto mb-4 text-[#FFDAB9]" />
        <h2 className="text-3xl font-bold mb-2 ">
          INI HALAMAN DASHBOARD
        </h2>
        <p className="mb-6 text-[#FFEFD5]">
          STATISTIK DATA AKAN TAMPIL DI SINI
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
