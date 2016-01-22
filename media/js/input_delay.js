var input_delay = (function()
    {
        var timer = 0;
        return function(callback, ms)
        {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

delay = function(ms, func)
{
  return setTimeout(func, ms);
};
